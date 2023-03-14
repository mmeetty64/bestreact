import React, { FC, useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '../../../Context/ContextWrapper'
import { IProps } from '../../../Interfaces/Component.interface'
import Service from '../../../Service/Service'

export const PublicSale: FC<IProps> = ({address}) => {

    const [price, setPrice] = useState<number>(-1)
    const {transact, getTransact} = useContext(Context)

    const publSaleHandler = async(e: any) =>{
        e.preventDefault();
        const {target} = e
        const priceData = await Service.viewTokenPrice()
        setPrice(priceData)
        const sale = await Service.publicSale(target[0].value, price, address)
        getTransact(transact+1)
    }

  return (
    <Form onSubmit={publSaleHandler} style={{width: "40%"}}>
        <p className='text-center' style={{fontSize: "1.7rem"}}>Публичная покупка</p>

      <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Введите кол-во желаемых токенов" />
      </Form.Group>

      <Button variant="primary" type="submit" style={{width: "100%"}}>
        Submit
      </Button>
    </Form>
  )
}
