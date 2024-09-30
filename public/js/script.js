$(document).ready(function () {
    // Xử lý form thêm chi tiêu qua AJAX
    $('form').on('submit', function (event) {
        event.preventDefault(); // Ngăn form load lại trang

        let formData = {
            category: $('#category').val(),
            amount: $('#amount').val(),
            description: $('#description').val(),
            date: $('#date').val(),
            payment_method: $('#payment_method').val(),
            tags: $('#tags').val().split(','),
        };

        // Gửi dữ liệu qua AJAX
        $.ajax({
            url: '/api/expenses',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                // Hiển thị thông báo thành công và làm mới danh sách
                //alert('Expense added successfully!');
                location.reload();
            },
            error: function (error) {
                alert('Error adding expense: ' + error.responseText);
            }
        });
    });
});
