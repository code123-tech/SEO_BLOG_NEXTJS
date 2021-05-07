import Carousel from "react-elastic-carousel";
import Item from "./Item";
import { Card, CardText, CardBody, CardTitle, CardSubtitle, CardLink } from 'reactstrap';
import moment from 'moment';
import Link  from 'next/link';
import styles from "./blogCard.module.css";

const breakPoints = [
    {width:1,itemsToShow:1},
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
];
const RelatedBlogs = ({relatedBlogs})=>{
    return (
        <>
            <center><u>Related Blogs</u></center>
            <Carousel breakPoints={breakPoints}>
                {
                    relatedBlogs.map((blog)=>{
                        return (
                            <Item key={blog._id}>
                            <Card>
                                <CardLink href={`/blogs/${blog.slug}`}>
                                    {blog.title}
                                </CardLink>
                                <div className={styles.relatedBackground} style={{backgroundImage:`url(${process.env.API}/blog/photo/${blog.slug})`}}></div>
                                <CardBody>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                                        👦 | Written By :- {blog.postBy ? blog.postBy.name:"Author"}
                                    </CardSubtitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                                        🕐 | {moment(blog.updatedAt).fromNow()}
                                    </CardSubtitle>
                                    <CardText>
                                        {blog.description.substring(0,blog.description.length/2)+"...."}
                                    </CardText>
                                </CardBody>
                            </Card>
                            </Item>
                        )
                    })
                }
            </Carousel>
        </>
    )
}
export default RelatedBlogs;