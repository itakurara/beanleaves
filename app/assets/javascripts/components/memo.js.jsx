var MemoBox = React.createClass({
  getInitialState: function(){
    return { data: [] }
  },
  handleNewText: function(editedData){
    $.ajax({
      url: this.props.url + '/' + editedData.id,
      datatype: 'json',
      type: 'PUT',
      data: editedData,
      success: function(data){
        this.setState({ data: data})
      }.bind(this),
      error: function(xhr, status, err){
    }.bind(this)
    });
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
      <MemoList data={this.state.data} onChangeText={this.handleNewText} />
    );
  }
});
var MemoList = React.createClass({
  handleNewText: function(editedData){
    this.props.onChangeText(editedData);
  },
  render: function(){
    var colors = ['yellow', 'blue', 'pink', 'green'];
    var memoNodes = this.props.data.map(function(memo, i){
      var bgColor = colors[i%4];
      var classString = 'view view--' + bgColor;
      return (
        <MemoView text={memo.content} id={memo.id} classString={classString} onChangeText={this.handleNewText} />
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
      editing: false,
      classString: this.props.classString
    }
  },
  handleStateChange: function(text={}){
    if(this.state.editing){
      this.setState({
        editing: false,
        classString: this.props.classString
      });
      if(text && text !== this.props.text){
        this.props.onChangeText({ text: text, id: this.props.id });
      }
    }else{
      this.setState({
        editing: true,
        classString: this.props.classString + " editing"
      })
    }
  },
  render: function(){
    return (
      <div className={this.state.classString} >
        <MemoText text={this.props.text} onClickEditBtn={this.handleStateChange} />
        <MemoForm text={this.props.text} onClickSubmitBtn={this.handleStateChange} />
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
        <input type="button" value="削除" className="memoText__btn" onClick={this.props.handleDelete} />
      </div>
    );
  }
});
var MemoForm = React.createClass({
  getInitialState: function(){
    return { text: this.props.text }
  },
  handleChange: function(e){
    this.setState({ text: e.target.value })
  },
  handleSubmit: function(){
    var text = this.state.text.trim();
    if(!text){ return }
    this.props.onClickSubmitBtn(text);
  },
  render: function(){
    return (
      <div className="memoForm">
        <input type ="text" value={this.state.text} className="memoForm__txt" onChange={this.handleChange} />
        <input type="button" value="OK!" onClick={this.handleSubmit} className="memoForm__btn" />
      </div>
    );
  }
});
