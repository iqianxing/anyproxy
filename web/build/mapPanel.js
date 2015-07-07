require("../lib/jstree");

function init(React){
	var MapForm = require("./mapForm").init(React),
		MapList = require("./mapList").init(React);

	var MapPanel = React.createClass({displayName: "MapPanel",
		appendRecord : function(data){
			var self          = this,
				listComponent = self.refs.list;
			
			listComponent.appendRecord(data);
		},
		
		render:function(){
			var self = this;
			return (
				React.createElement("div", {className: "mapWrapper"}, 
					React.createElement("h4", {className: "subTitle"}, "Current Config"), 
					React.createElement(MapList, {ref: "list"}), 
					
					React.createElement("h4", {className: "subTitle"}, "Map Local"), 
					React.createElement(MapForm, {onSubmit: self.appendRecord})
				)
			);
		}
	});

	return MapPanel;
}

module.exports.init = init;