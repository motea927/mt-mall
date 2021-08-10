import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export const alertSuccess = (title: string) => {
  Toast.fire({
    icon: 'success',
    title: title,
  })
}

export const alertError = (title: string) => {
  Toast.fire({
    icon: 'error',
    title: title,
  })
}
