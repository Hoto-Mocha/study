export default () => {
    return(<div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Something clever.."/>
        <div class="input-group-append">
            <button class="btn btn-primary" type="button">OK</button>
            <button class="btn btn-danger" type="button">Cancel</button>
        </div>
    </div>);
}