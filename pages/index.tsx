import { Button, Card, Col, Input, Row, Space } from 'antd';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Page } from '../types/Page';
import { Controller, useForm } from 'react-hook-form';
import { CreateCustomerSchemaType } from '@/schemas/CreateCustomerSchema';
import customerDataAtom from '@/data/Customers';
import { useAtom } from 'jotai';

const IndexPage: Page = () => {

    const {handleSubmit, control, formState: {errors}} = useForm<CreateCustomerSchemaType>();
    const [queue, setQueue] = useAtom(customerDataAtom);

    function onFormSubmit(formData: CreateCustomerSchemaType){
        const newCustomerName = formData.name;
        const newQueue = queue;
        const randCashierIndex = Math.floor(Math.random() * 3);

        newQueue[randCashierIndex].push(newCustomerName);
        setQueue(newQueue);

    }

    function handleQueue(index){
        const updatedQueue = queue;
        updatedQueue[index]?.pop();

        setQueue(updatedQueue);
    }

    return (
        <>
            <Space direction="vertical" size={"middle"} style={{ display: "flex" }}>
                <Row>
                    <Space direction="horizontal" size={"middle"} style={{ display: "flex" }}>
                        <Col>
                            <Space direction="vertical" size={"middle"}>
                                <Card className="border-2 border-black">Cashier #1</Card>
                                <Space direction="vertical" size={"middle"} >
                                    {queue[0].map((item, index) => (
                                        <Card className="border-2 border-black" style={{ borderRadius: "100%" }} key={index} >{item}</Card>
                                    ))}
                                </Space>
                            </Space>
                        </Col>
                        <Col>
                            <Space direction="vertical" size={"middle"}>
                                <Card className="border-2 border-black">Cashier #2</Card>
                                <Space direction="vertical" size={"middle"} >
                                    {queue[1].map((item, index) => (
                                        <Card className="border-2 border-black" style={{ borderRadius: "100%" }} key={index} >{item}</Card>
                                    ))}
                                </Space>
                            </Space>
                        </Col>
                        <Col>
                            <Space direction="vertical" size={"middle"}>
                                <Card className="border-2 border-black">Cashier #3</Card>
                                <Space direction="vertical" size={"middle"} >
                                    {queue[2].map((item, index) => (
                                        <Card className="border-2 border-black" style={{ borderRadius: "100%" }} key={index} >{item}</Card>
                                    ))}
                                </Space>
                            </Space>
                        </Col>
                    </Space>
                </Row>
                <Row>
                    <Space direction="horizontal" size={"middle"} style={{ display: 'flex' }}>
                        <Col>
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                <Controller 
                                    name="name"
                                    control={control}
                                    render={({field}) => <Input placeholder="Name"/> }  >                          
                                </Controller>
                                {errors.name && <p>{errors.name.message}</p>}
                                <Button type="default">Enter Line</Button>
                            </form>
                        </Col>
                        <Col>
                            <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
                                <Button type="default" onClick={() => handleQueue(0)}>Handle Cashier #1</Button>
                                <Button type="default" onClick={() => handleQueue(1)}>Handle Cashier #2</Button>
                                <Button type="default" onClick={() => handleQueue(2)}>Handle Cashier #2</Button>
                            </Space>
                        </Col>
                    </Space>
                </Row>
            </Space>     
        </>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
