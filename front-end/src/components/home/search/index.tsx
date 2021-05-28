import React from 'react'
import './search.css'

export class Search extends React.Component<{},{keyword: string}> {
  constructor(props: any) {
    super(props)
    this.state = {keyword:''};

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event: any) => {
    this.setState({keyword:event.target.value});
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(this.state.keyword)
  }
  
  render() {
    return <div className="search-wrapper">
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.keyword} onChange={this.handleChange}/>
        <button type="submit">search</button>
      </form>
    </div>
    
    ;
  }
}