[![NPM Version](http://img.shields.io/npm/v/browserwall.svg)](https://www.npmjs.org/package/browserwall)
[![NPM Downloads](https://img.shields.io/npm/dm/browserwall.svg)](https://www.npmjs.org/package/browserwall)
[![Massachusetts Institute of Technology (MIT)](https://s-a.github.io/license/img/mit.svg)](/LICENSE.md#mit)
[![Donate](http://s-a.github.io/donate/donate.svg)](http://s-a.github.io/donate/)

# React Browser Wall Component


This component is based on [bowser](https://github.com/lancedikson/bowser) so `<BrowserWall />` [property settings are defined here](https://github.com/lancedikson/bowser). `<BrowserWallExit />` will render a default `Browser not supported DOM` but you can define your own `children` and provide a side entrance link.

## Installation

```bash
npm i browserwall --save
```

## Example 1

```javascript
import {BrowserWall, BrowserWallExit} from 'browserwall'

const supportedBrowserTree = {
	chrome: '>86',
	firefox: '>80',
	edge: '>86'
}
const result = (
	<ErrorBoundary>
		<BrowserWall {...supportedBrowserTree}>
			<div className="App" valid="true">
				{this.state.user ? null : <Redirect to={`/login${redirectUri}`}></Redirect>}
				{this.renderApplicationCore()}
				<ToastContainer />
			</div>
			<BrowserWallExit />
		</BrowserWall>
	</ErrorBoundary>
)
```

## Example 2

```javascript
import {BrowserWall, BrowserWallExit} from 'browserwall'

const supportedBrowserTree = {
	chrome: '>86',
	firefox: '>80',
	edge: '>86'
}
const result = (
	<ErrorBoundary>
		<BrowserWall {...supportedBrowserTree} isValidBrowser={this.state.isValidBrowser}>
			<div className="App" valid="true">
				{this.state.user ? null : <Redirect to={`/login${redirectUri}`}></Redirect>}
				{this.renderApplicationCore()}
				<ToastContainer />
			</div>
			<BrowserWallExit>:O( <a href="#side-entrance" onClick={this.onSideEntranceClick.bind(this)}>I feel adventurous. I want to go in anyway.</a></BrowserWallExit>
		</BrowserWall>
	</ErrorBoundary>
)
```
