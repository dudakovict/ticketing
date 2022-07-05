import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { OrderCancelledEvent, OrderStatus } from '@dudakovict-ticketing/common'
import { OrderCancelledListener } from '../order-cancelled-listener'
import { Ticket } from '../../../models/ticket'
import { natsWrapper } from '../../../nats-wrapper'

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client)

    const orderId = new mongoose.Types.ObjectId().toHexString()

    const ticket = Ticket.build({
        title: 'ticket',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString()
    })

    ticket.set({ orderId })

    await ticket.save()

    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id,
        }
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, orderId, ticket, data, msg }
}

it('updates the ticket, publishes and event, and acks the message', async () => {
    const { listener, orderId, ticket, data, msg } = await setup()

    await listener.onMessage(data, msg)

    const updatedTicket = await Ticket.findById(ticket.id)

    expect(updatedTicket!.orderId).not.toBeDefined()
    expect(msg.ack).toHaveBeenCalled()
    expect(natsWrapper.client.publish).toHaveBeenCalled()
})