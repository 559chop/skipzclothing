import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import CustomButton from '../custom-button/custom-button.component'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_ooTX1nFiRkvaEvuB7rKz7ZMm00nMYQYQkg'

  const onToken = token => {
    console.log(token)
    alert('Payment Successful')
  }
  return (
    <StripeCheckout
      name='Skipster'
      billingAddress
      shippingAddress
      image={'https://sendeyo.com/up/d/f3eb2117da'}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    >
      <CustomButton>Pay Now</CustomButton>
    </StripeCheckout>
  )
}

export default StripeCheckoutButton
