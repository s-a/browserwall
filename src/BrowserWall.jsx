import React from 'react'
import Browser from 'bowser'
import PropTypes from 'prop-types'

class BrowserWall extends React.Component {
	static displayName = 'BrowserWall'
	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		]).isRequired,
		isValidBrowser: PropTypes.bool
	}

	constructor(props) {
		super(props)
		const browser = Browser.getParser(window.navigator.userAgent)
		const { children, isValidBrowser, ...supportedBrowserTree } = this.props
		this.supportedBrowserTree = supportedBrowserTree
		this.state = {
			isValidBrowser: browser.satisfies(this.supportedBrowserTree)
		}
	}

	onSideEntranceClick() {
		this.setState({
			isValidBrowser: true
		})
	}

	render() {
		if (this.props.isValidBrowser || this.state.isValidBrowser) {
			return this.props.children.filter(child => child.type.displayName !== 'BrowserWallExit')
		} else {
			return this.props.children.filter(child => child.type.displayName === 'BrowserWallExit').map((child, index) => {
				const key = `browser-wall-exit-${index}`
				return <BrowserWallExit onSideEntranceClick={this.onSideEntranceClick.bind(this)} key={key} supportedBrowserTree={this.supportedBrowserTree}>{child.props.children}</BrowserWallExit>
			})
		}
	}
}

class BrowserWallExit extends React.Component {
	static displayName = 'BrowserWallExit'
	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		])
	}

	capitalize(s) {
		if (typeof s !== 'string') return ''
		return s.charAt(0).toUpperCase() + s.slice(1)
	}

	renderSupportedBrowsers() {
		return (
			<ul className="list-group list-group-flush">
				<li className="list-group-item">
					We recommend <a target="_blank" rel="noreferrer" href="https://chromium.woolyss.com/download/">chromium</a>, but you can choose any of the following list.
				</li>
				{Object.keys(this.props.supportedBrowserTree).map(key => {
					return <li key={`supported-browser-name-${key}`} className="list-group-item">{this.capitalize(key)} version: {this.props.supportedBrowserTree[key]}</li>
				})}
			</ul>
		)
	}

	onSideEntranceClick(e) {
		e.preventDefault()
		this.props.onSideEntranceClick()
		return false
	}

	renderDefaultBrowserWallHint() {
		return (
			<main role="main" className="container">
				<div className="row">
					<div className="col">
						<h1>Your browser is not supported.</h1>
						<p className="lead">
							Please update to a newer version or install a supported browser. <br />
						</p>
						{this.renderSupportedBrowsers()}

						<a href="/side-entrance" onClick={this.onSideEntranceClick.bind(this)}>I feel adventurous. I want to go in anyway.</a>
					</div>
				</div>
			</main>
		)
	}

	render() {
		return (this.props.children ? this.props.children : this.renderDefaultBrowserWallHint())
	}
}

BrowserWallExit.propTypes = {
	supportedBrowserTree: PropTypes.object,
	onSideEntranceClick: PropTypes.func
}

export default BrowserWall
export { BrowserWall, BrowserWallExit }