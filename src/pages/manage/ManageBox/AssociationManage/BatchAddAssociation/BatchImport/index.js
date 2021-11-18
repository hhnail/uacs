import {Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;

export default function BatchImport() {

    // const props = {
    //     name: 'file',
    //     multiple: true,
    //     action: '/association/batchImportUser',
    //     onChange(info) {
    //         const {status} = info.file;
    //         if (status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //         } else if (status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    //     onDrop(e) {
    //         console.log('Dropped files', e.dataTransfer.files);
    //     },
    // };

    const handelFileChange = (info) => {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
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

