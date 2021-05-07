import Head from 'next/head';
import Link from 'next/link';
import styles from "./blogCard.module.css";
import moment from 'moment';
import CatTagList from './catTagList';

const BlogCard = ({blogList})=>{
    return (
        <>
            {
                blogList.map((blog,i)=>{
                    return (
                        <div className={styles.blogcard} key={i}>
                            <div className={styles.meta}>
                                <div className={styles.photo} style={{backgroundImage:`url(${process.env.API}/blog/photo/${blog.slug})`}}></div>
                                <ul className={styles.details}>
                                    <li className={styles.author}>{blog.postBy?blog.postBy.name:"Author"}</li>
                                    <li className={styles.date}>{
                                        moment(blog.updatedAt).fromNow()
                                    }</li>
                                    <li className={styles.tags}>
                                        <CatTagList list={blog.tags} number={0}/>
                                    </li>
                                    <li className={styles.tags}>
                                        <CatTagList list={blog.categories} number={1}/>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.description}>
                                <h1 style={{fontSize:"1.5rem"}}>
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <a>{i+1}{". "+blog.title}</a>
                                    </Link>
                                </h1>
                                <p style={{fontSize:"1rem"}}>{blog.description}</p>
                                <p className={styles.readMore}>
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <a>Read More</a>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default BlogCard;