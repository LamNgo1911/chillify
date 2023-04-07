import React, { useEffect } from 'react'

function Footer() {
    const [footer, setFooter] = React.useState(false)
    useEffect(() => {
        setTimeout(() => {
            setFooter(true)
        }, 3000)
    }, [])
  return (
    <div>
        {footer 
        && 
        <footer className='flex w-full h-[20vh] bg-bgColor text-textColor border-t border-bgColorLight flex-row items-center justify-center'>
            <p>© 2023 Lamngo1911</p>
        </footer>
        }
    </div>
  )
}

export default Footer
