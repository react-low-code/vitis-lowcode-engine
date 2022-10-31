import React from 'react'
import cn from 'classnames'
import Icon from './Component'
import './index.less'



interface State {
    active?: boolean
}

interface Props {
    
}

export default class ComponentsPane extends React.Component<Props,State>{
    state: Readonly<State> = {
        active: false
    }

    onClick = () => {
        // todo
    }

    render(){
        return <div className='components-pane'>
            <Icon 
                className={cn({icon: true, active: this.state.active})}
                onClick={this.onClick}
            />
        </div>
    }
}