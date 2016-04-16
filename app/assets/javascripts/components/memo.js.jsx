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
    var colors = ['yellow', 'blue', 'pink', 'green'];
    var memoNodes = this.props.data.map(function(memo, i){
      var bgColor = colors[i%4];
      var classString = 'view view--' + bgColor;
      return (
        <MemoView text={memo.content} classString={classString} />
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
  handleStateChange: function(){
    // TODO
  },
  render: function(){
    return (
      <div className={this.props.classString} >
        <MemoText text={this.props.text} onClickEditBtn={this.handleStateChange} />
        <MemoForm text={this.props.text} />
      </div>
    );
  }
});
var MemoText = React.createClass({
  handleEdit: function(){
    this.props.onClickEditBtn();
  },
  render: function(){
    return (
      <div className="memoText">
        <p>{this.props.text}</p>
        <input type="button" value="編集" className="memoText__btn" onClick={this.handleEdit} />
        <input type="button" value="削除" className="memoText__btn" onClick={this.handleDelete} />
      </div>
    );
  }
});
var MemoForm = React.createClass({
  render: function(){
    return (
      <input type ="text" value={this.props.text} className="memoForm" />
    );
  }
});
