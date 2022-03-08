import React from 'react'
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'

function SaveDialog(props) {
  const { onClose, open, date } = props
  const { register, handleSubmit } = useForm()
  const handleClose = () => {
    onClose(false)
  }
  const handleData = (data) => {
    const revenue = { ...data, date_paid: date }
    console.log(revenue)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Save Revenue</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleData)}>
          <TextField
            {...register('Customer')}
            label="Customer"
            name="Customer"
            fullWidth
          />
          <TextField
            {...register('Amount')}
            label="Amount"
            name="Amount"
            fullWidth
          />
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SaveDialog
