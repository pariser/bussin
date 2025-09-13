[![npm version](https://img.shields.io/npm/v/bussin-js)](https://www.npmjs.com/package/bussin-js)

**bussin-js** is a lightweight JavaScript library for event-driven programming. It provides flexible event bus and evented class patterns, making it easy to implement pub/sub and custom event handling in your applications.

## Usage

## Installation

Using npm:
```shell
$ npm i --save bussin-js
```
### Import

```js
import { EventBus, Evented, StaticEvented } from 'bussin-js';
```

### Create an EventBus

An `EventBus` allows for event pub/sub.

```js
const bus = new EventBus();

bus.on('newUser', (name, profile) => console.log(`new user ${name}: ${profile}`));

bus.emit('newUser', 'pariser', 'https://github.com/pariser');
bus.emit('newUser', 'potch', 'https://github.com/potch');
```

### Create an Evented class

In an `Evented` class, each instance of the class has its own event bus.

```js
// event publishing

class Player extends Evented(['healthChange']) {
  constructor(name) {
    this.name = name;
    this.health = 20;
  }

  setHealth(newHealth) {
    this.health = newHealth;
    this.emit('healthChange', this.health);
  }
}

// event subscription

const players = [
  new Player('pariser'),
  new Player('potch'),
];

players.forEach(player => {
  player.on('healthChange', newHealth => {
    if (newHealth === 0) {
      console.log(`player ${player.name} is down`);
    }
  });
});
```

### Create a StaticEvented class

In a `StaticEvented` class, the class itself has an event bus attached to it.

```js
// publish events

let muted = false;

class Audio extends StaticEvented(['mutedChange']) {
  static setMuted(newMuted = true) {
    muted = !!newMuted;
    Audio.emit('mutedChange', muted);
  }

  static getMuted() {
    return muted;
  }
}

// subscribe to events

class AudioIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audioMuted: Audio.getMuted(),
    };

    Audio.on('mutedChange', muted => this.setState({ audioMuted: muted }));
  }

  render({}, { audioMuted }) {
    return html`
      <button title="Sound" onClick=${() => Audio.setMuted(!audioMuted)}>
        ${audioMuted ? html`<${AudioOffIcon} />` : html`<${AudioOnIcon} />`}
      </button>
    `;
  }
}
```

## Primary Contributors

- **pariser** ([GitHub](https://github.com/pariser))
- **potch** ([GitHub](https://github.com/potch))
