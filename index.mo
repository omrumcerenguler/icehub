import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

actor Main {
    public query func getProducts() : async [Text] {
        // Backend'den ürünleri almak için çağırma yapın
        let products = await ProductBackend.getAllProducts();
        return Array.map<Product, Text>(products, func (product) {
            return "ID: " # Nat.toText(product.id) # ", Ad: " # product.name # ", Fiyat: " # Nat.toText(product.price) # ", Açıklama: " # product.description;
        });
    };

    public shared(msg) func addProduct(name: Text, price: Nat, description: Text) : async Nat {
        return await ProductBackend.addProduct(name, price, description);
    }
}
