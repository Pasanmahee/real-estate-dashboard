import { Result, Button } from 'antd';
import type { ButtonProps } from 'antd/es/button';
import React from 'react';
import styles from '../../pages/DeviceTemplateManager/ManageDeviceTemplate/style.less';

interface SuccessNoticeProps extends ButtonProps {
    done: boolean;
    subTitle: string;
    onDone: () => void;
}

const SuccessNotice: React.FC<SuccessNoticeProps> = (props) => {
    const { done, subTitle, onDone } = props
    return (
        <Result
            status="success"
            title="Success"
            subTitle={subTitle}
            extra={
                <Button type="primary" onClick={onDone}>
                    Ok
                </Button>
            }
            className={styles.formResult}
        />
    );
};

export default SuccessNotice;