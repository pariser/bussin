## Usage

### Import

```js
import { EventBus, Evented } from "bussin.js";
```

### Create an EventBus

```js
const bus = new EventBus(["foo", "bar"]);
bus.on("foo", (data) => console.log("foo", data));
bus.emit("foo", { hello: "world" });
```

### Create an Evented class

```js
const MyEvented = Evented(["start", "stop"]);
const obj = new MyEvented();
obj.on("start", () => console.log("Started!"));
obj.emit("start");
```
