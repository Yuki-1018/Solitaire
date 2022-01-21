/**
 * @author Okzuo3
 *  List Class modoki
 */

// リストのアイテムクラス
//		リスト内で使うアイテムクラスで、前後のリストクラスオブジェクトの参照とデータオブジェクトの参照を持ちます
//		これは基本的には外部に公開しない
var ListItem = function(data,prev,next){
	this.prev = prev;
	this.next = next;
	this.data = data;
};
// リストクラス本体
//		データをリストで管理します。
//		データの移動と参照：
//		get_top() で先頭リストアイテムの参照を返します。
//		get_next()で次のリストアイテムの参照を返します。
//		get_prev()で前のリストアイテムの参照を返します。
//		get_data()で指定したリストアイテムからデータの参照を取得できます。
//		データの追加：
//		add()で最後尾にデータを追加します。
//		insert()で第１パラメータで指定したリストアイテムの前に挿入します。null なら最後尾に追加します。
//		データの削除：
//		remove()で指定したアイテムを削除します。
//		remove_all() でリスト内の全アイテムを削除し、リストを初期状態に戻します。
var List = function(){
	this.top     = null;		// 先頭のアイテム（の参照）
	this.last     = null;		// 最後のアイテム（の参照）
	this.length = 0;		// アイテム数
};
// List class method
List.prototype = {
	// アイテムの追加メソッド
	add : function(data) {  // 最後尾に追加
		var item = new ListItem(data,this.last,null);
		if( this.last != null ){
			this.last.next = item;
			this.last = item;
		}
		else{
			this.top = item;
			this.last = item;
		}
		this.length++;
		return item;
	},
	// アイテムの挿入メソッド
	insert : function(basepos, data){	// basepos の前に挿入 basepos がnullなら最後に挿入
		if( basepos != null ){
			var previtem = basepos.prev;
			var item = new ListItem(data,previtem,basepos);
			basepos.prev = item;
			if( previtem == null ){
				this.top = item;
			}
			else{
				previtem.next = item;
			}
			this.length++;
			return item;
		}
		else{
			return this.add(data);
		}
	},
	// アイテムの削除メソッド
	remove : function(pos){
		if( pos != null && this.isitem( pos ) ){
			// 指定されたアイテムがリストに存在するかをチェックする
			if( this.top == pos ){
				this.top = pos.next;
			}
			if( this.last == pos ){
				this.last = pos.prev;
			}
			if( pos.next != null ){
				pos.next.prev = pos.prev;
			}
			if( pos.prev != null ){
				pos.prev.next = pos.next;
			}
			pos.next = null;
			pos.prev = null;
			delete pos;
			this.length--;
			return true;
		}
		return false;
	},
	// すべてを削除
	remove_all : function(){
		var item = this.top;
		while( item != null ){
			var next = item.next;
			delete item;
			item = next;
		}
		this.top = null;
		this.last = null;
		this.length = 0;
	},
	isitem : function(pos){
		if(pos==null)	return false;
		var bFound = false;
		var itempos = this.get_top();
		while( itempos != null ){
			if( itempos == pos ){
				bFound = true;
				break;
			}
			itempos = this.get_next(itempos);
		}
		return bFound;
	},
	get_data : function(pos){
		if(pos!=null)	return pos.data;
		else			return null;
	},
	get_prev : function(pos){
		if(pos!=null)	return pos.prev;
		else			return null; 
	},
	get_next : function(pos){
		if(pos!=null)	return pos.next;
		else			return null; 
	},
	get_top : function(){
		return this.top;
	},
	get_last : function(){
		return this.last;
	},
	get_length : function(){
		return this.length;
	},
};
