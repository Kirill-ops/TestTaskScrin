namespace Storage.Entities;

internal interface IEntity<TCoreModel> where TCoreModel : class
{
    public TCoreModel GetModel();
}
