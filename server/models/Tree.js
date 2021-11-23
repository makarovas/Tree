const Node = require("./Node");

class Tree  {
    constructor(){
        this.removedNodes = []
        this.cleanData();
    }

    create_tree(devices){
        this.cleanData();
        const appearance = this.count_appearance(devices);

        for (let i = 0; i < devices.length; i++) {
            const { markerId, productId, deviceName, manufacturer } = devices[i];
    
            const index = devices[i].markerId + devices[i].productId;
            
            if(appearance[index] === 0) continue;

            //Hub with one port 
            else if(appearance[index] === 1){
                //New hub type
                if(manufacturer === "(Standard USB HUBs)"){
                    const node = new Node(this.nextId++, markerId, productId, deviceName, "Hub");
                    appearance[index]--
                    this.root.children.push(node);
                }
                //New device type
                else{
                    const hub = new Node(this.nextId++, markerId, productId, `${deviceName}'s hub`, "Hub");
                    const device = new Node(this.nextId++, markerId, productId, deviceName, "Device");
                    hub.children.push(device);
                    appearance[index]--
                    this.root.children.push(hub);
                }
            }

            //Hub with multiple ports
            else{
                const hub = new Node(this.nextId++, markerId, productId, "Hub", "Hub");
                
                for(let j = 0; j < devices.length; j++){
                    if (devices[i].markerId === devices[j].markerId && devices[i].productId === devices[j].productId) {
                        const device = new Node(this.nextId++, markerId, productId, deviceName, (manufacturer === "(Standard USB HUBs)" ? "Hub" : "Device"));
                        hub.children.push(device);
                    }
                }
                appearance[index] = 0;
                this.root.children.push(hub);
            }
        }
        //New disconnected device type
        for(let i = 0; i < this.removedNodes.length; i++){
            const { markerId, productId, deviceName, manufacturer } = this.removedNodes[i];
            const hub = new Node(this.nextId++, markerId, productId, `${deviceName}'s hub`, "Hub");
            const device = new Node(this.nextId++, markerId, productId, deviceName, "Device", "Disconnected");
            hub.children.push(device);
            this.root.children.push(hub);
        }
    }

    create_grouped_by_type_root(devices){
        const devicesGroup = new Node();
        devicesGroup.type = "Devices";
        devicesGroup.deviceName = "Devices";
        devicesGroup.id = this.nextId++;

        const hubs = new Node();
        hubs.type = "Hubs";
        hubs.deviceName = "Hubs";
        hubs.id = this.nextId++;
        
        for (let i = 0; i < devices.length; i++) {
            const { markerId, productId, deviceName, manufacturer } = devices[i];

            if(manufacturer === "(Standard USB HUBs)"){
                const node = new Node(this.nextId++, markerId, productId, deviceName, "Hub");
                hubs.children.push(node);
            } else {
                const device = new Node(this.nextId++, markerId, productId, deviceName, "Device");
                devicesGroup.children.push(device);
            }
        }

        for(let i = 0; i < this.removedNodes.length; i++){
            const { markerId, productId, deviceName, manufacturer } = this.removedNodes[i];
            const device = new Node(this.nextId++, markerId, productId, deviceName, "Device", "Disconnected");
            devicesGroup.children.push(device);
        }

        this.typeRoot.children.push(devicesGroup);
        this.typeRoot.children.push(hubs);
    }

    count_appearance(devices){
        const appearance = {};

        //Filling appearance object
        for (let i = 0; i < devices.length; i++) {
            const index = devices[i].markerId + devices[i].productId;
            if (appearance[index]) 
                appearance[index]++;
            else 
                appearance[index] = 1;    
        }

        return appearance;
    }

    cleanData(){
        this.root = new Node();
        this.root.type = "Server";
        this.root.deviceName = "Server";
        this.root.id = 1;

        this.typeRoot = new Node();
        this.typeRoot.type = "Server";
        this.typeRoot.deviceName = "Server";
        this.typeRoot.id = 2;

        this.nextId = 3;
    }

    add(device){
        if(this.removedNodes.length > 0){
            const result = this.removedNodes.filter( removed => removed.markerId !== device.markerId && removed.productId !== device.productId )
            this.removedNodes = result;
        }
    }

    remove(device){
        this.removedNodes.push(device);
    }
}

module.exports = new Tree();