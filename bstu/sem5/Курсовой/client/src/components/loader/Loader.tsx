import classes from './Loader.module.css'

const Loader: React.FC = () => {
    return (
        <div className={classes.bg}>
            <div className={classes.wrap}>
                <div className={classes.loader}></div>
                Loading...
            </div>
        </div>
    )
}

export default Loader;