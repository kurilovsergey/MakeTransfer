import React, {Component} from "react"

class App extends Component {
    constructor() {
        super()
        this.state = {
            name: "Sally",
            age: 13
        }
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <h3><font color="#3AC1EF">▍{this.state.age} years old</font></h3>
            </div>
        )    
    }
}

export default App