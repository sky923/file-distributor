import { getFiles } from '../common/server-lib';
import config from '../src/config';

const files = (props) => (
    <div><ul>{props.files.map((file, i) => (<li key={i.toString()}>
        <a href={(config.secured ? "https" : "http") + "://" + config.ip + ":" + config.port + "/" + file}>{file}</a>
    </li>))
    } </ul></div>
);
files.getInitialProps = async ({ query }) => {
    const config = await import('../src/config');
    const files = await getFiles(config.folder);
    return { files };
};
export default files;