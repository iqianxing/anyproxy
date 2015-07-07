function init(React){
	var MapList = React.createClass({displayName: "MapList",
		getInitialState:function(){
			return {
				ruleList : []
			}
		},
		appendRecord:function(data){
			var self = this,
			    newState = self.state.ruleList;

		    if(data && data.keyword && data.local){
				newState.push({
					keyword : data.keyword,
					local   : data.local
				});

				self.setState({
					ruleList: newState
				});
		    }

		},

		removeRecord:function(index){
			var self    = this,
				newList = self.state.ruleList;

			newList.splice(index,1);
			self.setState({
				ruleList : newList
			});
		},
		render:function(){
			var self       = this,
			    collection = [];

		    collection = self.state.ruleList.map(function(item,index){
		    	return (
					React.createElement("li", null, 
						React.createElement("strong", null, item.keyword), React.createElement("a", {className: "removeBtn", href: "#", onClick: self.removeRecord.bind(self,index)}, "remove"), React.createElement("br", null), 
						React.createElement("span", null, item.local)
					)
	    		);
		    });

			return (
				React.createElement("ul", {className: "mapRuleList"}, 
					collection
				)
			);
		},
		componentDidMount :function(){
			var self = this;
			$.getJSON("/getMapConfig",function(data){
				self.setState({
					ruleList : data
				});
			});
		},
		componentDidUpdate:function(){
			var self = this;
			//sync config

			var currentList = self.state.ruleList;
			$.ajax({
				method      : "POST",
				url         : "/setMapConfig",
				contentType :"application/json",
				data        : JSON.stringify(currentList),
				dataType    : "json",
				success     :function(res){}
			});
		}
	});

	return MapList;
}

module.exports.init = init;