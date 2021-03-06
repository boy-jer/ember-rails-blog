EmberBlog.PostIndexController = Ember.ObjectController.extend({
  content: null,

  destroy: function() {
    this.transaction = this.get('store').transaction();
    var content = this.get('content');
    this.transaction.add(content);
    if (window.confirm("Are you sure you want to delete this post?")) {
      content.deleteRecord();
      content.one('didDelete', function() {
        EmberBlog.Router.router.transitionTo('posts.index');
      });
      this.transaction.commit();
    }
    else{
      this.transaction.rollback();
      this.transaction = null;
    }
  }
});
