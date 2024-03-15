import React from "react";
import { Input, Button, notification } from "antd";
import { isEmpty } from "lodash";

const ButtonInputSearch = (props) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: "Vui lòng nhập từ khoá tìm kiếm"
        });
    };
    const { size, placeholder, textbutton, bordered, callbacksearch } = props;
    return (
        <>
            {contextHolder}
            <div style={{ display: "flex" }}>
                <Input
                    id="input-search"
                    size={size}
                    placeholder={placeholder}
                    {...props}
                />
                <Button
                    onClick={() => {
                        const value = document.getElementById("input-search")?.value;
                        if (!isEmpty(value)) {
                            callbacksearch(value);
                        } else {
                            openNotificationWithIcon("error");
                        }
                    }}
                    style={{ background: "#7D7C7C" }}
                    size={size}
                    icon={<i className="fa-solid fa-magnifying-glass"></i>}
                >
                    {textbutton}
                </Button>
            </div>
        </>
    );
};
export default ButtonInputSearch;
