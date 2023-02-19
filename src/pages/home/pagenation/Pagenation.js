import { Box, Button, Stack } from '@chakra-ui/react'
import React from 'react'

const Pagenation = ({page,setPage,pageCount}) => {
    const handlePrev = ()=>{
        setPage(()=>{
            if(page === 1) return page
            return page -1
        })
    }

    const handleNext = ()=>{
        setPage(()=>{
            if(page === pageCount) return page
            return page + 1
        })
    }
  return (
    <Stack direction="row" alignItems="center" gap="8px" justifyContent="center" mb="20px">
        <Button onClick={handlePrev} colorScheme="blackAlpha" variant="outline">PREV</Button>
        {Array(pageCount).fill(null).map((elem,index)=>(
            <Button w="40px" h="40px" borderRadius="50%" colorScheme="blackAlpha" isActive={page === index + 1 ? true : false} onClick={() =>setPage(index + 1)}>{index + 1}</Button>
        ))}
        <Button onClick={handleNext} ml="50px"  colorScheme="blackAlpha" variant="outline" >NEXT</Button>
    </Stack>
  )
}

export default Pagenation