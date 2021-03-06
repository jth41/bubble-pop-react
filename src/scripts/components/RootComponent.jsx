var Viewport = require('./viewport/Viewport.jsx');
var ViewportInterface = require('./viewport/Interaction.jsx');


module.exports = React.createClass({
    getInitialState: function ()
    {
        return {
            viewportSize: { w: 0, h: 0 }
        };
    },
    componentDidMount: function ()
    {
        this.updateViewportSize();
    },
    componentDidUpdate: function ()
    {
        this.updateViewportSize();
    },
    updateViewportSize: function ()
    {
        var nextSize = { w: 0, h: 0 };
        if (_.isObject(this.mainContent))
        {
            nextSize.w = this.mainContent.clientWidth;
            nextSize.h = this.mainContent.clientHeight;
        }
        if (!_.isEqual(this.state.viewportSize, nextSize))
        {
            console.log('updating size');
            this.setState({ viewportSize: nextSize });
        }
    },
    onInterfaceChange: function (message)
    {
        var isInteractionLayerActive = this.isInteractionLayerActive();
        this.viewport.applyInput(message);

        if (this._isMouseDown !== isInteractionLayerActive)
        {
            this._isMouseDown = isInteractionLayerActive;
            this.setState({ isInteractionLayerActive });
        }
    },
    isInteractionLayerActive: function ()
    {
        return (_.isObject(this.interface) && this.interface.isActive());
    },
    render: function ()
    {
        return (
          <div className="root">
              <main ref={_.set.bind(this, this, 'mainContent' )}>
                <Viewport ref={_.set.bind(this, this, 'viewport')} {...this.props} size={this.state.viewportSize} />
                <ViewportInterface ref={_.set.bind(this, this, 'interface')}
                                   style={this.state.isInteractionLayerActive ? {'zIndex' : 100} : {}}
                                   viewportSize={this.state.viewportSize}
                                   onChange={this.onInterfaceChange} />
              </main>
          </div>
        );
    }
});