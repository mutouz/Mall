const http="http://localhost:";
const pore="52263";

const imgUrl=http+pore+'/AvatarImg/';
const registerUrl=http+pore+'/api/User/Regist';
const UpdateCustomerUrl=http+pore+'/api/Customer/UpdateCustomer';
const AddShippingAddressUrl=http+pore+'/api/ShippingAddress/AddShippingAddress';
const loginUrl=http+pore+'/api/User/Login';
const DeleteShippingAddressUrl=http+pore+'/api/ShippingAddress/DeleteShippingAddress';
const UpdateShippingUrl=http+pore+'/api/ShippingAddress/Update';
const SearchShippingAddressUrl=http+pore+'/api/ShippingAddress/SearchShippingAddress';
const GetOneShippingUrl=http+pore+'/api/ShippingAddress/GetOne';
const GetCommodityTypeUrl=http+pore+'/api/CommodityType/GetCommodityType';
const ProductByCommodityTypeUrl=http+pore+'/api/CommodityType/ProductByCommodityType';
const ProductByCommodityTypeNameUrl=http+pore+'/api/CommodityType/ProductByCommodityTypeName';
const SeachProductUrl=http+pore+'/api/CommodityType/SeachProduct';
const AddOrderUrl=http+pore+'/api/PlaceOrder/AddOrder';
const SearchOrderUrl=http+pore+'/api/PlaceOrder/SearchOrder';
const GoodsIsOKUrl=http+pore+'/api/PlaceOrder/GoodsIsOK';
const IsPaymentUrl=http+pore+'/api/PlaceOrder/IsPayment';
const GetOneCustomerUrl=http+pore+'/api/Customer/GetOne'; //返回个人信息
const AddCardUrl=http+pore+'/api/ShoppingCart/AddCard'; //添加购物车信息
const DeleteCardUrl=http+pore+'/api/ShoppingCart/DeleteCard'; //取消购物车
const SeachCardUrl=http+pore+'/api/ShoppingCart/SeachCard'; //返回购物车
const SeachProducsUrl=http+pore+'/api/CommodityType/SeachProducs'; //根据id集合查询商品信息


export {
    registerUrl,
    imgUrl,
    loginUrl,
    UpdateCustomerUrl,
    AddShippingAddressUrl,
    DeleteShippingAddressUrl,
    UpdateShippingUrl,
    SearchShippingAddressUrl,
    GetOneShippingUrl,
    GetCommodityTypeUrl,
    ProductByCommodityTypeUrl,
    ProductByCommodityTypeNameUrl,
    SeachProductUrl,
    AddOrderUrl,
    SearchOrderUrl,
    GoodsIsOKUrl,
    IsPaymentUrl,
    GetOneCustomerUrl,
    AddCardUrl,
    DeleteCardUrl,
    SeachCardUrl,
    SeachProducsUrl
}