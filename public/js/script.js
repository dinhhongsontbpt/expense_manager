// Xử lý form thêm chi tiêu qua AJAX
$('form').on('submit', function (event) {
    event.preventDefault(); // Ngăn form load lại trang

    let formData = {
        type: $('#type').val(), // Thêm dòng này
        category: $('#category').val(),
        amount: $('#amount').val(),
        description: $('#description').val(),
        date: $('#date').val(),
        payment_method: $('#payment_method').val(),
        // tags: $('#tags').val().split(','), // Nếu bạn không còn sử dụng tags
    };

    // Gửi dữ liệu qua AJAX
    $.ajax({
        url: '/api/expenses',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
            // Hiển thị thông báo thành công và làm mới danh sách
            location.reload();
        },
        error: function (error) {
            alert('Error adding expense: ' + error.responseText);
        }
    });
});


$(document).ready(function () {
    // Tự động chọn ngày hiện tại cho trường 'date'
    let today = new Date().toISOString().substr(0, 10);
    $('#date').val(today);

    // Xử lý sự kiện xóa chi tiêu
    $('#expense-list').on('click', '.delete-expense', function () {
        let expenseId = $(this).closest('li').data('id'); // Lấy id của chi tiêu

        // Hiển thị hộp thoại xác nhận
    const confirmDelete = confirm('Are you sure you want to delete this expense?');
    if (confirmDelete) {
        $.ajax({
            url: `/api/expenses/${expenseId}`,
            method: 'DELETE',
            success: function(response) {
                // Cập nhật giao diện sau khi xóa thành công
                //alert('Expense deleted successfully!');
                location.reload(); // Làm mới trang để cập nhật danh sách chi tiêu
            },
            error: function(error) {
                alert('Error deleting expense: ' + error.responseText);
            }
        });
    }
    });
});
