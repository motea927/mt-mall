import PurchaseAddressType from '/@/types/PurchaseAddressType'
import PurchaseCreditType from '/@/types/PurchaseCreditType'
import ProductType from '/@/types/ProductType'

interface OrderType {
  userId: string
  purchaseInformation: PurchaseAddressType & PurchaseCreditType
  cart: ProductType[]
  totalPrice: number
  date: string
}

export default OrderType
