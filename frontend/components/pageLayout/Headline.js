import styles from "./Headline.module.css";

const Headline = ({content})=>{
    return (
        <div className={styles.jumbotron}>
            <h2 className="text-center">
                {content}
            </h2>
        </div>
    )
}

export default Headline;