var MemoBox = React.createClass({
  getInitialState: function(){
    return { data: [] }
  },
  componentDidMount: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data){
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    });
  },
  render: function() {
    return (
      <MemoList data={this.state.data} />
    );
  }
});
var MemoList = React.createClass({
  render: function(){
    var memoNodes = this.props.data.map(function(memo){
      return (
          <MemoView text={memo.content} />
      );
    });
    return (
      <div className="memoList" >
        {memoNodes}
      </div>
    )
  }
});
var MemoView = React.createClass({
  render: function(){
    return (
      <div className="view view--yellow" >
        <MemoText text={this.props.text} />
        <MemoForm text={this.props.text} />
      </div>
    );
  }
});
var MemoText = React.createClass({
  render: function(){
    return (
      <p>{this.props.text}</p>
    );
  }
});
var MemoForm = React.createClass({
  render: function(){
    return (
      <input type ="text" value={this.props.text} />
    );
  }
});
