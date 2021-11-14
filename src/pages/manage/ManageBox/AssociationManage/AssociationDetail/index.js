import {useState} from 'react'
import {Modal, Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default function AssociationDetail(props) {

    // 预览图片 Modal、图片、标题
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ],)


    // 预览图片
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    // 控制上传change
    const handleChange = ({fileList}) => {
        setFileList(fileList)
    };


    return (
        <div>


            <Upload listType="picture-card"
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                action="/"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8
                    ? null
                    : <div>
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>上传图片</div>
                    </div>}
            </Upload>
            <Modal title={previewTitle} visible={previewVisible}
                   footer={null}
                   onCancel={() => {
                       setPreviewVisible(false)
                   }}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </div>
    );
}