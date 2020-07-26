/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
document.querySelectorAll('.action-delete').forEach(($deleteAction) => {
  $deleteAction.addEventListener('click', (e) => {
    const { id, name } = $deleteAction.dataset;
    if (
      !confirm(
        `Confirma que desea eliminar el club ${name} (ID: ${id})? Esta operación no se puede deshacer`
      )
    ) {
      e.preventDefault();
      return false;
    }

    return true;
  });
});
