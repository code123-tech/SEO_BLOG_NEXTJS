import Layout from "./../../components/pageLayout/Layout";
import Admin from "./../../components/auth/Admin";
import Link from "next/link";
import Headline from './../../components/pageLayout/Headline';

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <Headline content="Admin dashboard" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/category-tag">
                    <a>Create Category</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/category-tag">
                    <a>Create Tag</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/blog">
                    <a>Create Blog</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">Hello From Content</div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};
export default AdminIndex;
