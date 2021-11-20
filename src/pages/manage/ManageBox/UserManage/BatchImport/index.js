import {Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;

export default function BatchImport() {

    const handelFileChange = (info) => {
        const {status} = info.file;
        if (status === 'done') {
            message.success('批量导入成功！');
        } else if (status === 'error') {
            message.error('批量导入失败，请检查数据格式！');
        }
    }

    return <Dragger name='file' multiple
                    action='/association/batchImportUser'
                    onChange={handelFileChange}
                    onDrop={(e) => {
                        console.log('Dropped files', e.dataTransfer.files);
                    }}>
        <p><InboxOutlined/></p>
        <p className="ant-upload-text">点击右上角按钮或上传文件批量导入</p>
        <p className="ant-upload-hint"
           style={{
               marginTop: 10,
           }}
        >可选择学生名单进行社团成员批量导入，请确保文件数据格式符合右侧规则说明！</p>
    </Dragger>

}

