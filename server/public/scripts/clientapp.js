$(document).ready(function() {
  $(document).on('click', 'button', function(event) {
    if (confirm('Are you sure you want to delete this task?')) {
      var id = $(this).parent().val();
      deleteTask(id);
      $(this).parent().remove();
    }
  });

  get();
  $('form').on('submit', function(event){
    event.preventDefault();

    var task = $('#task').val();
    post(task);
  });
});

function post(task){
  $.ajax(
    {
      type: 'post',
      url: 'task',
      data: {
        task: task,
        status: 'new'
      },
      success: function (task){
        get(task.id);
      },
      error: function(err){
        console.log(err);
      }
    })
}

function deleteTask(id) {
  $.ajax(
    {
      type: 'delete',
      url: 'task/' + id
    }
  )
}

function get(id) {
  var taskList = $('#taskList');
  $.ajax(
    {
      type: 'get',
      url: id ? 'task/' + id : 'task',
      success: function(respondsData){
        $(respondsData).each(function(i, item){
          var row = document.createElement('tr');
          var id = document.createElement('td');
          var name = document.createElement('td');
          var status = document.createElement('td');
          var deleteBtn = document.createElement('button');

          $(deleteBtn).text('Delete');

          $(row).addClass('row');

          $(id).text(item.id);
          $(name).text(item.task_name);
          $(status).text(item.status);

          $(row).append(id);
          $(row).append(name);
          $(row).append(status);
          $(row).append(deleteBtn);

          $(row).val(item.id);

          $(taskList).append(row);
        });
      },
      error: function(err){
        console.log(err);
      }
    })
}