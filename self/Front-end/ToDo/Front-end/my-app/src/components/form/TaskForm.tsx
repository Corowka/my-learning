import React, { useState } from "react";
import classes from './TaskForm.module.css'
import { Form, Input, Button } from "antd"

interface TaskFromProps {
    addTask: (body: string) => void;
}

const TaskForm: React.FC<TaskFromProps> = ({ addTask }) => {
    const [body, setBody] = useState<string>('');
    return (
        <Form className={classes.form}>
            <Form.Item className={classes.formItem} rules={[{ required: true }]}>
                <Input
                    className={classes.input}
                    placeholder="What we going to do today? 😉"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </Form.Item>
            <Button
                onClick={() => {addTask(body); setBody('')}}
                htmlType="submit"
            > Добавить </Button>
        </Form>
    )
}

export default TaskForm;