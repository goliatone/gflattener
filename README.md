# Flattener

[![Build Status](https://secure.travis-ci.org/goliatone/flattener.png)](http://travis-ci.org/goliatone/flattener)

Object flattener helper library. Convert (nested) objects to and from flat objects of keypath values.


## Documentation

### flatten

`flatten(source,[delimeter='.'])`

Transform any deep nested object in a flat object of keypath values.

```js
Flattener.flatten({user: { name: 'peperone' }})
{'user.name': 'peperone'}
```

### unflatten

`unflatten(flatObject,[delimeter='.'])`

Transform a flattened object into a regular object.

```js
Flattener.flatten({'user.name': 'peperone'})
{user: { name: 'peperone' }}
```

### glob

`glob(flatObject,regexp)`

Iterate over all keys and return the ones matching a given regexp.


## Examples

The following is an example of flattening a user object:

```js
let user = {
  name: { title: 'mr', first: 'brad', last: 'gibson' },
  location: {
    street: '9278 new road',
    city: 'kilcoole',
    state: 'waterford',
    postcode: '93027',
    coordinates: { latitude: '20.9267', longitude: '-7.9310' },
    timezone: { offset: '-3:30', description: 'Newfoundland' }
  },
  email: 'brad.gibson@example.com',
  handles: [
    { site: 'twitter', handle: 'mr.brad' },
    { site: 'github', handle: 'bradC0d3z' }
  ]
};

let flatUser = Flattener.flatten(user);
console.log(flatUser);
```

The output in the console would show something similar to the following:

```js
{
  'name.title': 'mr',
  'name.first': 'brad',
  'name.last': 'gibson',
  'location.street': '9278 new road',
  'location.city': 'kilcoole',
  'location.state': 'waterford',
  'location.postcode': '93027',
  'location.coordinates.latitude': '20.9267',
  'location.coordinates.longitude': '-7.9310',
  'location.timezone.offset': '-3:30',
  'location.timezone.description': 'Newfoundland',
  email: 'brad.gibson@example.com',
  'handles.0.site': 'twitter',
  'handles.0.handle': 'mr.brad',
  'handles.1.site': 'github',
  'handles.1.handle': 'bradC0d3z'
}
```

You can go back to a regular object:

```js
let obj = Flattener.unflatten(flatUser);
```

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/goliatone/gflattener/master/dist/flattener.min.js
[max]: https://raw.github.com/goliatone/gflattener/master/dist/flattener.js

## Development

`npm install && bower install`

If you need to `sudo` the `npm` command, you can try to:

```terminal
sudo chown $(whoami) ~/.npm
sudo chown $(whoami) /usr/local/share/npm/bin
sudo chown -R $(whoami) /usr/local/lib/node_modules
```


If you bump versions, remember to update:
- package.json
- bower.json
- component.json
- etc.


## Bower

>Bower is a package manager for the web. It offers a generic, unopinionated solution to the problem of front-end package management, while exposing the package dependency model via an API that can be consumed by a more opinionated build stack. There are no system wide dependencies, no dependencies are shared between different apps, and the dependency tree is flat.

To register flattener in the [bower](http://bower.io/) [registry](http://sindresorhus.com/bower-components/):
`bower register flattener git://github.com/goliatone/gflattener.git`

Then, make sure to tag your module:

`git tag -a v0.1.0 -m "Initial release."`

And push it:

`git push --tags`


## Travis

In order to enable Travis for this specific project, you need to do so on your Travi's [profile](https://travis-ci.org/profile). Look for the entry `goliatone/flattener`, activate, and sync.

## Release History
_(Nothing yet)_
