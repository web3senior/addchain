import Icon from './FontIcon'
const Heading = (props) =>
    <div className='heading'>
        <div className='__frame d-flex justify-align-center align-items-center' data-width='xlarge'>
            <Icon name={props.icon} />
            <span>{props.name}</span>
        </div>
    </div>

export default Heading