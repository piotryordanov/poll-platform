import React, { useState } from 'react';
import moment from 'moment';
import { Divider, notification } from 'antd';
import { Form, Input, Button, DatePicker } from 'antd';
import { useRouter } from 'next/router';

import { SmileOutlined } from '@ant-design/icons';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 44 },
    sm: { span: 14 },
  },
};

const defaultValues = {
  title: 'asd',
  options: ['ads', 'daf', 'bla'],
  enddate: moment('2022-09-30T03:00:00.973Z'),
};
const defaultEmpty = {
  title: '',
  options: ['', '', ''],
  enddate: '',
};

import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from './firebase';

const Create = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const data = { ...values, timestamp: serverTimestamp() };
    data.enddate = data.enddate.unix();
    console.log(data.enddate);
    setComponentDisabled(true);

    addDoc(collection(db, 'polls'), data).then((e) => {
      console.log(e);
      notification.open({
        message: 'Success!',
        description: 'Your poll was succesfuly created!',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
      router.push('/');
    });
  };
  const values = defaultValues;
  console.log(values.title);

  return (
    <div
      className='h-screen w-screen'
      style={{
        backgroundColor: '#DFDBE5',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='12' height='24' viewBox='0 0 12 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M2 0h2v12H2V0zm1 20c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM9 8c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-1 4h2v12H8V12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
    >
      <div className='layout h-screen bg-bgAlt pt-36 '>
        <h1 className='mb-12 text-center'>Create New Poll</h1>
        <div className='mx-auto w-80 lg:w-96'>
          <Form
            onFinish={onFinish}
            layout='horizontal'
            name='dynamic_form_item'
            {...formItemLayout}
            disabled={componentDisabled}
            initialValues={values}
          >
            <Form.Item
              name='title'
              rules={[{ required: true, message: 'Please add a Title!' }]}
              label='Title'
            >
              <Input type='input' placeholder='Title' />
            </Form.Item>
            <Divider />
            <Form.List
              name='options'
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error('At least 2 options'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...formItemLayout}
                      label={`Option ${index + 1}`}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              'Please input an option or delete this field.',
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder='poll option'
                          style={{ width: '90%' }}
                        />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className='dynamic-delete-button ml-2 mb-[-8px]'
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item
                    className={`${
                      fields.length > 4 ? 'hidden' : ''
                    } flex justify-center `}
                  >
                    <Button
                      type='dashed'
                      onClick={() => add()}
                      // style={{ width: '100%' }}
                      icon={<PlusOutlined />}
                    >
                      Add Poll option
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                  <Divider />
                </>
              )}
            </Form.List>
            <Form.Item
              name='enddate'
              label='End Date'
              rules={[
                { required: true, message: 'Please select an end date!' },
              ]}
            >
              <DatePicker showTime={true} />
            </Form.Item>
            <Divider />
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button right'
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Create;
