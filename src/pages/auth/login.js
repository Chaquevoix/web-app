import { Button, Checkbox, Form, Input, message } from 'antd';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { redirect } from "react-router-dom";

function Login() {

    const onFinish = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                message.success("Login successful.")
                const user = userCredential.user;
                redirect("/account")
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    message.error("This account does not exist.")
                }

                if (error.code === "auth/wrong-password") {
                    message.error("Wrong password.")
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">

                <Form.Item label="Email" name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Email cannot be empty.',
                        },
                        {
                            type: "email",
                            message: 'This is not a valid email.',
                        },
                    ]}>

                    <Input />

                </Form.Item>

                <Form.Item label="Password" name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Password cannot be empty.',
                        },
                    ]}>

                    <Input.Password />

                </Form.Item>

                <Form.Item>

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
