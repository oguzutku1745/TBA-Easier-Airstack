const AccountComponent = ({acc}) => {

    console.log(acc)

    return(
        <div>
            {acc.address.addresses[0]}
        </div>
    )
}

export default AccountComponent