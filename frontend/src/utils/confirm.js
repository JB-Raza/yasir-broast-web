/**
 * confirm.js — centralised SweetAlert2 confirmation helpers
 *
 * All project Swal confirmations should go through these helpers so the
 * styling stays consistent and only ever needs to be changed in one place.
 *
 * ─── Usage ─────────────────────────────────────────────────────────────
 *
 *   import { confirmDanger, confirmAction } from '../utils/confirm';
 *
 *   // Destructive: delete / cancel / clear (red confirm button)
 *   const ok = await confirmDanger({
 *     title:       'Cancel Order?',
 *     text:        'This cannot be undone.',
 *     confirmText: 'Yes, cancel it',
 *   });
 *   if (ok) cancelOrder(id);
 *
 *   // Non-destructive: just needs acknowledgment (gold confirm button)
 *   const ok = await confirmAction({
 *     title:       'Save Changes?',
 *     text:        'Your preferences will be updated.',
 *   });
 *   if (ok) savePrefs();
 */

import Swal from 'sweetalert2';

/* ── Shared popup base ─────────────────────────────────────────────── */
const BASE = {
  showCancelButton:   true,
  reverseButtons:     true,           // Cancel on left, Confirm on right
  showCloseButton:    true,
  allowOutsideClick:  true,
  buttonsStyling:     true,
  customClass: {
    popup:         'swal-popup-rounded',
    confirmButton: 'swal-confirm-btn',
    cancelButton:  'swal-cancel-btn',
  },
};

/* ── Danger confirmation ───────────────────────────────────────────── */
/**
 * Shows a red-button confirmation for destructive actions.
 * @param {{ title: string, text?: string, confirmText?: string, cancelText?: string }} opts
 * @returns {Promise<boolean>} true if the user confirmed, false otherwise
 */
export async function confirmDanger({
  title,
  text        = '',
  confirmText = 'Yes, proceed',
  cancelText  = 'Keep it',
} = {}) {
  const result = await Swal.fire({
    ...BASE,
    icon:               'warning',
    iconColor:          '#C41E3A',
    title:              `<span style="font-family:'Montserrat',sans-serif;font-size:20px;font-weight:800;color:#2D2D2D">${title}</span>`,
    html:               text
      ? `<p style="font-family:'Open Sans',sans-serif;font-size:14px;color:#666;margin:0">${text}</p>`
      : '',
    confirmButtonText:  confirmText,
    cancelButtonText:   cancelText,
    confirmButtonColor: '#C41E3A',
    cancelButtonColor:  '#e0e0e0',
    /* override cancel btn text color to dark — buttonsStyling applies bg */
    didOpen: () => {
      const cancelBtn = Swal.getCancelButton();
      if (cancelBtn) {
        cancelBtn.style.color  = '#2D2D2D';
        cancelBtn.style.fontFamily = "'Montserrat', sans-serif";
        cancelBtn.style.fontWeight = '700';
      }
    },
  });
  return result.isConfirmed;
}

/* ── Neutral / action confirmation ────────────────────────────────── */
/**
 * Shows a gold-button confirmation for non-destructive sensitive actions.
 * @param {{ title: string, text?: string, confirmText?: string, cancelText?: string }} opts
 * @returns {Promise<boolean>} true if the user confirmed, false otherwise
 */
export async function confirmAction({
  title,
  text        = '',
  confirmText = 'Confirm',
  cancelText  = 'Cancel',
} = {}) {
  const result = await Swal.fire({
    ...BASE,
    icon:               'question',
    iconColor:          '#FFD700',
    title:              `<span style="font-family:'Montserrat',sans-serif;font-size:20px;font-weight:800;color:#2D2D2D">${title}</span>`,
    html:               text
      ? `<p style="font-family:'Open Sans',sans-serif;font-size:14px;color:#666;margin:0">${text}</p>`
      : '',
    confirmButtonText:  confirmText,
    cancelButtonText:   cancelText,
    confirmButtonColor: '#2D2D2D',
    cancelButtonColor:  '#e0e0e0',
    didOpen: () => {
      const cancelBtn = Swal.getCancelButton();
      if (cancelBtn) {
        cancelBtn.style.color      = '#2D2D2D';
        cancelBtn.style.fontFamily = "'Montserrat', sans-serif";
        cancelBtn.style.fontWeight = '700';
      }
    },
  });
  return result.isConfirmed;
}
