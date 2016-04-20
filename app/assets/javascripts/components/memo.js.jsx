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
  deleteMemo: function(memoId){
    $.ajax({ url: this.props.url + '/' + memoId,
      type: 'DELETE',
      dataType: 'json',
      success: function(data){
        console.log('ajax delete success')
        this.setState({ data: data })
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    });
  },
  render: function() {
    return (
      <MemoList url={this.props.url} data={this.state.data} onDeleteMemo={this.deleteMemo} />
    );
  }
});
var MemoList = React.createClass({
  deleteMemo: function(memoId){
    this.props.onDeleteMemo(memoId);
  },
  render: function(){
    var colors = ['yellow', 'blue', 'pink', 'green'];
    var memoNodes = this.props.data.map(function(memo, i){
      var bgColor = colors[i%4];
      var classString = 'view view--' + bgColor;
      return (
        <MemoView text={memo.content} url={this.props.url} id={memo.id} classString={classString} onDeleteMemo={this.deleteMemo} />
        );
    }.bind(this));
    return (
      <div className="memoList" >
        {memoNodes}
      </div>
    )
  }
});
var MemoView = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.text,
      classString: this.props.classString
    }
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({ text: nextProps.text })
  },
  handleDelete: function(){
    this.props.onDeleteMemo(this.props.id);
  },
  handleEdit: function(){
    this.setState({ classString: this.props.classString + " editing" });
  },
  handleChange: function(e){
    this.setState({ text: e.target.value })
  },
  // MemoView内のことだからここにした
  handleUpdate: function(){
    var text = this.state.text.trim();
    this.setState({
    classString: this.props.classString
    });
    if(!text){ return }
    if(text !== this.props.text){
      $.ajax({ url: this.props.url + '/' + this.props.id,
        datatype: 'json',
        type: 'PUT',
        data: { text: text },
        success: function(data){
          this.setState({ text: text });
        }.bind(this),
        error: function(xhr, status, err){
          console.error(this.props.url, status, err.toString())
        }.bind(this)
      });
    }
  },
  render: function(){
    return (
      <div className={this.state.classString} >
        <div className="memoText">
          <p>{this.state.text}</p>
          <input type="button" value="編集" className="memoText__btn" onClick={this.handleEdit} />
          <input type="button" value="削除" className="memoText__btn" onClick={this.handleDelete} />
        </div>
        <div className="memoForm">
          <input type ="text" value={this.state.text} className="memoForm__txt" onChange={this.handleChange} />
          <input type="button" value="OK" onClick={this.handleUpdate} className="memoForm__btn" />
        </div>
      </div>
    );
  }
});
