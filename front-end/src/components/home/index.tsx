import { ToLogin } from '../toLogin'
import { Search } from '../search'

import React from 'react'

import './home.css'

export class Home extends React.Component<{},{keyword: string}> {
  
  render() {
    return <div className="home">
        <Search />
        <ToLogin />
    </div>
    
    ;
  }
}